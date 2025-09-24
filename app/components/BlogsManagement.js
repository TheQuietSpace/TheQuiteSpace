import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabse';
import { Button, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Avatar, ListItemAvatar, Tabs, Tab } from '@mui/material';
import { useForm } from 'react-hook-form';

function ContentManagement() {
  const [blogs, setBlogs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [tabValue, setTabValue] = useState(0); // 0 for Blogs, 1 for Articles
  const [contentType, setContentType] = useState('blogs'); // Tracks whether editing blog or article
  const { register, handleSubmit, reset, setValue, getValues } = useForm();

  // Fetch blogs and articles
  useEffect(() => {
    async function fetchContent() {
      const [blogsData, articlesData] = await Promise.all([
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
      ]);
      if (blogsData.error) {
        console.error('Fetch blogs error:', blogsData.error.message);
        setErrorMessage('Failed to fetch blogs: ' + blogsData.error.message);
      } else {
        setBlogs(blogsData.data || []);
      }
      if (articlesData.error) {
        console.error('Fetch articles error:', articlesData.error.message);
        setErrorMessage('Failed to fetch articles: ' + articlesData.error.message);
      } else {
        setArticles(articlesData.data || []);
      }
    }
    fetchContent();
  }, []);

  // Handle image upload based on content type
  const uploadImage = async (file) => {
    if (!file) return null;

    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      console.error('Invalid file type:', fileExtension);
      setErrorMessage('Invalid file type. Please upload a .jpg, .jpeg, .png, or .gif file.');
      return null;
    }

    const bucket = contentType === 'blogs' ? 'blog-images' : 'article-images';
    const fileName = `images/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });
    if (error) {
      console.error('Image upload error:', error.message);
      setErrorMessage('Failed to upload image: ' + error.message);
      return null;
    }
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  // CRUD Operations
  const onSubmit = async (formData) => {
    setErrorMessage(null);
    const imageFile = formData.image?.[0];
    let imageUrl = formData.image_url;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) return;
    }

    const table = contentType === 'blogs' ? 'blogs' : 'articles';
    if (editingId) {
      const { error } = await supabase
        .from(table)
        .update({ title: formData.title, content: formData.content, image_url: imageUrl })
        .eq('id', editingId);
      if (error) {
        console.error(`Update ${table} error:`, error.message);
        setErrorMessage(`Failed to update ${table.slice(0, -1)}: ${error.message}`);
        return;
      }
      setEditingId(null);
    } else {
      if (!imageUrl) {
        console.error('Image is required for new entry');
        setErrorMessage('An image is required for new entries');
        return;
      }
      const { error } = await supabase
        .from(table)
        .insert({ title: formData.title, content: formData.content, image_url: imageUrl });
      if (error) {
        console.error(`Insert ${table} error:`, error.message);
        setErrorMessage(`Failed to create ${table.slice(0, -1)}: ${error.message}`);
        return;
      }
    }
    reset();
    setOpen(false);
    // Refresh list
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (error) {
      console.error(`Fetch ${table} error:`, error.message);
      setErrorMessage(`Failed to fetch ${table}: ${error.message}`);
    } else {
      contentType === 'blogs' ? setBlogs(data || []) : setArticles(data || []);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setValue('title', item.title);
    setValue('content', item.content);
    setValue('image_url', item.image_url);
    setContentType(item.table); // Store the table type (blogs or articles)
    setOpen(true);
  };

  const handleDelete = async (id, type) => {
    const table = type === 'blogs' ? 'blogs' : 'articles';
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      console.error(`Delete ${table} error:`, error.message);
      setErrorMessage(`Failed to delete ${table.slice(0, -1)}: ${error.message}`);
    } else {
      type === 'blogs' ? setBlogs(blogs.filter(b => b.id !== id)) : setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleOpen = (type) => {
    reset();
    setEditingId(null);
    setContentType(type);
    setErrorMessage(null);
    setOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', padding: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        Content Management
      </Typography>
      {errorMessage && <Typography color="error" gutterBottom align="center">{errorMessage}</Typography>}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="content management tabs" sx={{ mb: 2 }}>
          <Tab label="Blogs" sx={{ fontWeight: 'bold', textTransform: 'none' }} />
          <Tab label="Articles" sx={{ fontWeight: 'bold', textTransform: 'none' }} />
        </Tabs>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(tabValue === 0 ? 'blogs' : 'articles')}
          sx={{ ml: 2, height: '40px' }}
        >
          Add New {tabValue === 0 ? 'Blog' : 'Article'}
        </Button>
      </Box>
      {tabValue === 0 ? (
        <List>
          {blogs.map(blog => (
            <ListItem key={blog.id} divider sx={{ bgcolor: '#fff', borderRadius: 1, mb: 1, boxShadow: 1 }}>
              <ListItemAvatar>
                <Avatar
                  src={blog.image_url}
                  alt={blog.title}
                  variant="rounded"
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary">{new Date(blog.created_at).toLocaleString()}</Typography>}
              />
              <Button onClick={() => handleEdit({ ...blog, table: 'blogs' })} color="primary" sx={{ mr: 1 }}>Edit</Button>
              <Button onClick={() => handleDelete(blog.id, 'blogs')} color="error">Delete</Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {articles.map(article => (
            <ListItem key={article.id} divider sx={{ bgcolor: '#fff', borderRadius: 1, mb: 1, boxShadow: 1 }}>
              <ListItemAvatar>
                <Avatar
                  src={article.image_url}
                  alt={article.title}
                  variant="rounded"
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{article.title}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary">{new Date(article.created_at).toLocaleString()}</Typography>}
              />
              <Button onClick={() => handleEdit({ ...article, table: 'articles' })} color="primary" sx={{ mr: 1 }}>Edit</Button>
              <Button onClick={() => handleDelete(article.id, 'articles')} color="error">Delete</Button>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>
          {editingId ? `Edit ${contentType === 'blogs' ? 'Blog' : 'Article'}` : `Add New ${contentType === 'blogs' ? 'Blog' : 'Article'}`}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Title"
              {...register('title', { required: true })}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              {...register('content')}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            {editingId && (
              <Box sx={{ mt: 2, mb: 2, textAlign: 'center', bgcolor: '#fafafa', p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Current Image
                </Typography>
                <img
                  src={getValues('image_url')}
                  alt={`Current ${contentType === 'blogs' ? 'blog' : 'article'} image`}
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Box>
            )}
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              {editingId ? 'Upload New Image (optional)' : 'Upload Image'}
            </Typography>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              {...register('image', { required: !editingId })}
              style={{ marginBottom: '16px' }}
            />
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
              <Button onClick={() => setOpen(false)} color="secondary" variant="outlined" sx={{ borderRadius: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 2 }}>
                {editingId ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ContentManagement;