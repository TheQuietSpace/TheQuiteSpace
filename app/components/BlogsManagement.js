import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabse';
import { Button, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Avatar, ListItemAvatar } from '@mui/material';
import { useForm } from 'react-hook-form';

function BlogsManagement() {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, handleSubmit, reset, setValue, getValues } = useForm();

  // Fetch blogs
  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Fetch blogs error:', error.message);
        setErrorMessage('Failed to fetch blogs: ' + error.message);
      } else {
        setBlogs(data || []);
      }
    }
    fetchBlogs();
  }, []);

  // Handle image upload
  const uploadImage = async (file) => {
    if (!file) return null;

    // Validate file extension
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      console.error('Invalid file type:', fileExtension);
      setErrorMessage('Invalid file type. Please upload a .jpg, .jpeg, .png, or .gif file.');
      return null;
    }

    const fileName = `images/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { upsert: true });
    if (error) {
      console.error('Image upload error:', error.message);
      setErrorMessage('Failed to upload image: ' + error.message);
      return null;
    }
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  // CRUD Operations
  const onSubmit = async (formData) => {
    setErrorMessage(null); // Clear previous errors
    const imageFile = formData.image?.[0];
    let imageUrl = formData.image_url; // Keep existing URL if no new image is uploaded

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        return; // Error message set in uploadImage
      }
    }

    if (editingId) {
      // Update
      const { error } = await supabase
        .from('blogs')
        .update({ title: formData.title, content: formData.content, image_url: imageUrl })
        .eq('id', editingId);
      if (error) {
        console.error('Update blog error:', error.message);
        setErrorMessage('Failed to update blog: ' + error.message);
        return;
      }
      setEditingId(null);
    } else {
      // Create
      if (!imageUrl) {
        console.error('Image is required for new blog');
        setErrorMessage('An image is required for new blogs');
        return;
      }
      const { error } = await supabase
        .from('blogs')
        .insert({ title: formData.title, content: formData.content, image_url: imageUrl });
      if (error) {
        console.error('Insert blog error:', error.message);
        setErrorMessage('Failed to create blog: ' + error.message);
        return;
      }
    }
    reset();
    setOpen(false);
    // Refresh list
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Fetch blogs error:', error.message);
      setErrorMessage('Failed to fetch blogs: ' + error.message);
    } else {
      setBlogs(data || []);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setValue('title', blog.title);
    setValue('content', blog.content);
    setValue('image_url', blog.image_url); // Store existing image URL
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      console.error('Delete blog error:', error.message);
      setErrorMessage('Failed to delete blog: ' + error.message);
    } else {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const handleOpen = () => {
    reset();
    setEditingId(null);
    setErrorMessage(null);
    setOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Blog Management
      </Typography>
      {errorMessage && <Typography color="error" gutterBottom>{errorMessage}</Typography>}
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Add New Blog
      </Button>
      <List>
        {blogs.map(blog => (
          <ListItem key={blog.id} divider>
            <ListItemAvatar>
              <Avatar
                src={blog.image_url}
                alt={blog.title}
                variant="rounded"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={blog.title}
              secondary={new Date(blog.created_at).toLocaleString()}
            />
            <Button onClick={() => handleEdit(blog)} color="primary">Edit</Button>
            <Button onClick={() => handleDelete(blog.id)} color="error">Delete</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Title"
              {...register('title', { required: true })}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              {...register('content')}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            {editingId && (
              <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Current Image
                </Typography>
                <img
                  src={getValues('image_url')}
                  alt="Current blog image"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Box>
            )}
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              {editingId ? 'Upload New Image (optional)' : 'Upload Image'}
            </Typography>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              {...register('image', { required: !editingId })}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BlogsManagement;