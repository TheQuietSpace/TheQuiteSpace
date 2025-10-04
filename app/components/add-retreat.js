'use client';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabse';
import { useRouter } from 'next/navigation';
export default function AddRetreatPage({ initialData = null, isEdit = false, onClose }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [locations, setLocations] = useState(initialData?.location || []); // Changed to array
  const [description, setDescription] = useState(initialData?.description || '');
  const [schedule, setSchedule] = useState(initialData?.schedule || '');
  const [included, setIncluded] = useState(initialData?.included || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || null);
  const [galleryPreviews, setGalleryPreviews] = useState(initialData?.gallery_images || []);
  const [teachers, setTeachers] = useState(initialData?.teachers ? initialData.teachers.map(t => ({ ...t, image: null, preview: t.image_url || null })) : []);
  const [faqs, setFaqs] = useState(initialData?.faqs || []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const dateInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      galleryPreviews.forEach(url => URL.revokeObjectURL(url));
      teachers.forEach(t => t.preview && URL.revokeObjectURL(t.preview));
    };
  }, [imagePreview, galleryPreviews, teachers]);
  const validateForm = () => {
    if (!title.trim()) return 'Title is required.';
    if (!date) return 'Date is required.';
    if (!locations.length || locations.some(loc => !loc.trim())) return 'At least one non-empty location is required.';
    if (!description.trim()) return 'Description is required.';
    if (!schedule.trim()) return 'Schedule is required.';
    if (!included.trim()) return 'Included is required.';
    if (price === '' || isNaN(Number(price))) return 'Price is required and must be a number.';
    if (new Date(date) < new Date()) return 'Date cannot be in the past.';
    if (teachers.some(t => !t.name.trim() || !t.title.trim() || !t.description.trim() || !t.focus_areas.trim())) {
      return 'All teacher fields are required if added.';
    }
    if (faqs.some(cat => !cat.category.trim() || cat.faqs.some(q => !q.question.trim() || !q.answer.trim()))) {
      return 'All FAQ categories, questions, and answers are required if added.';
    }
    return '';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);
    setUploading(true);
    setError('');
    try {
      let imageUrl = imagePreview;
      if (image) {
        const fileExt = image.name.split('.').pop().toLowerCase();
        if (!['jpg','jpeg','png','gif'].includes(fileExt)) throw new Error('Main image must be JPG, JPEG, PNG, or GIF.');
        const fileName = `main_${Date.now()}_${Math.random().toString(36).slice(2,8)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('retreat-images').upload(fileName, image, { upsert: false });
        if (uploadError) throw new Error(uploadError.message);
        const { data } = supabase.storage.from('retreat-images').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }
      let galleryUrls = Array.isArray(galleryPreviews) ? [...galleryPreviews] : [];
      if (gallery.length > 0) {
        const galleryPromises = gallery.map(async (file, index) => {
          const fileExt = file.name.split('.').pop().toLowerCase();
          if (!['jpg','jpeg','png','gif'].includes(fileExt)) throw new Error(`Gallery image ${index+1} must be JPG, JPEG, PNG, or GIF.`);
          const fileName = `gallery_${Date.now()}_${index}_${Math.random().toString(36).slice(2,8)}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from('retreat-gallery').upload(fileName, file, { upsert: false });
          if (uploadError) throw new Error(uploadError.message);
          const { data } = supabase.storage.from('retreat-gallery').getPublicUrl(fileName);
          return data.publicUrl;
        });
        galleryUrls = [...galleryUrls, ...await Promise.all(galleryPromises)];
      }
      const teachersData = [];
      if (teachers.length > 0) {
        const teacherPromises = teachers.map(async (t, index) => {
          let teacherImageUrl = t.preview;
          if (t.image) {
            const fileExt = t.image.name.split('.').pop().toLowerCase();
            if (!['jpg','jpeg','png','gif'].includes(fileExt)) throw new Error(`Teacher ${index+1} image must be JPG, JPEG, PNG, or GIF.`);
            const fileName = `teacher_${Date.now()}_${index}_${Math.random().toString(36).slice(2,8)}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('retreat-images').upload(fileName, t.image, { upsert: false });
            if (uploadError) throw new Error(uploadError.message);
            const { data } = supabase.storage.from('retreat-images').getPublicUrl(fileName);
            teacherImageUrl = data.publicUrl;
          }
          return { name: t.name, title: t.title, description: t.description, focus_areas: t.focus_areas, image_url: teacherImageUrl };
        });
        teachersData.push(...await Promise.all(teacherPromises));
      }
      const faqsData = faqs.map(cat => ({ category: cat.category, faqs: cat.faqs.map(q => ({ question: q.question, answer: q.answer })) }));
      if (isEdit && initialData?.id) {
        const { error: updateError } = await supabase.from('retreats').update({
          title, date, location: locations, description, schedule, image_url: imageUrl, included, gallery_images: galleryUrls,
          teachers: teachersData, faqs: faqsData, price: price !== '' ? Number(price) : null
        }).eq('id', initialData.id);
        if (updateError) throw new Error(updateError.message);
        setSuccess(true);
        setTimeout(() => { setSuccess(false); if (onClose) onClose(); }, 1000);
      } else {
        const { error: insertError } = await supabase.from('retreats').insert({
          title, date, location: locations, description, schedule, image_url: imageUrl, included, gallery_images: galleryUrls,
          teachers: teachersData, faqs: faqsData, price: price !== '' ? Number(price) : null
        });
        if (insertError) throw new Error(insertError.message);
        setSuccess(true);
        handleReset();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch(err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };
  const handleReset = () => {
    setTitle(initialData?.title || '');
    setDate(initialData?.date || '');
    setLocations(initialData?.location || []); // Changed to array
    setDescription(initialData?.description || '');
    setSchedule(initialData?.schedule || '');
    setIncluded(initialData?.included || '');
    setPrice(initialData?.price || '');
    setImage(null);
    setGallery([]);
    setImagePreview(initialData?.image_url || null);
    setGalleryPreviews(initialData?.gallery_images || []);
    setTeachers(initialData?.teachers ? initialData.teachers.map(t => ({ ...t, image: null, preview: t.image_url || null })) : []);
    setFaqs(initialData?.faqs || []);
    setError('');
    setSuccess(false);
    if(dateInputRef.current) dateInputRef.current.value = initialData?.date || '';
    if(imageInputRef.current) imageInputRef.current.value = '';
    if(galleryInputRef.current) galleryInputRef.current.value = '';
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGallery(files);
    setGalleryPreviews(files.map(f => URL.createObjectURL(f)));
  };
  const addTeacher = () => setTeachers([...teachers, { name:'', title:'', description:'', focus_areas:'', image:null, preview:null }]);
  const removeTeacher = (i) => setTeachers(teachers.filter((_, idx) => idx !== i));
  const updateTeacher = (i, field, value) => { const t = [...teachers]; t[i][field]=value; setTeachers(t); };
  const handleTeacherImageChange = (i,e) => { const file=e.target.files?.[0]||null; const t=[...teachers]; t[i].image=file; t[i].preview=file?URL.createObjectURL(file):null; setTeachers(t); };
  const addFaqCategory = () => setFaqs([...faqs,{category:'',faqs:[]}]);
  const removeFaqCategory = (i) => setFaqs(faqs.filter((_,idx)=>idx!==i));
  const updateFaqCategory = (i,value)=>{ const f=[...faqs]; f[i].category=value; setFaqs(f); };
  const addFaqToCategory = (ci)=>{ const f=[...faqs]; f[ci].faqs.push({question:'',answer:''}); setFaqs(f); };
  const removeFaqFromCategory=(ci,fi)=>{ const f=[...faqs]; f[ci].faqs=f[ci].faqs.filter((_,idx)=>idx!==fi); setFaqs(f); };
  const updateFaqInCategory=(ci,fi,field,value)=>{ const f=[...faqs]; f[ci].faqs[fi][field]=value; setFaqs(f); };
  // Location handlers
  const addLocation = () => setLocations([...locations, '']);
  const removeLocation = (i) => setLocations(locations.filter((_, idx) => idx !== i));
  const updateLocation = (i, value) => { const locs = [...locations]; locs[i] = value; setLocations(locs); };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">{isEdit ? 'Edit Retreat' : 'Add a New Retreat'}</h1>
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium">{error}</div>}
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium flex justify-between items-center">
            <span>{isEdit ? 'Retreat updated successfully!' : 'Retreat added successfully!'}</span>
            {!isEdit && <button onClick={handleReset} className="ml-4 text-blue-600 hover:text-blue-800 font-semibold">Add Another</button>}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <input type="text" placeholder="Retreat Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            <input type="date" ref={dateInputRef} value={date} onChange={e=>setDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            <div>
              <h2 className="text-lg font-semibold mb-2">Locations</h2>
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Location ${i + 1}`}
                    value={loc}
                    onChange={e => updateLocation(i, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeLocation(i)}
                    className="ml-2 text-red-600 hover:text-red-800"
                    disabled={locations.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLocation}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
              >
                Add Location
              </button>
            </div>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              min="0"
              step="0.01"
              required
            />
            <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows={4} required/>
            <textarea placeholder="Schedule" value={schedule} onChange={e=>setSchedule(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows={4} required/>
            <textarea placeholder="What's Included" value={included} onChange={e=>setIncluded(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows={3} required/>
          </div>
          <div>
            <input type="file" accept="image/jpeg,image/png,image/gif" ref={imageInputRef} onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Main" className="max-w-xs mt-2 rounded" />}
          </div>
          <div>
            <input type="file" multiple accept="image/jpeg,image/png,image/gif" ref={galleryInputRef} onChange={handleGalleryChange} />
            {galleryPreviews && galleryPreviews.length>0 && <div className="grid grid-cols-3 gap-2 mt-2">{galleryPreviews.map((url,i)=><img key={i} src={url} className="rounded" alt={`Gallery ${i+1}`} />)}</div>}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Teachers</h2>
            {teachers.map((t,i)=>(
              <div key={i} className="mb-4 p-2 border rounded">
                <input placeholder="Name" value={t.name} onChange={e=>updateTeacher(i,'name',e.target.value)} className="w-full px-2 py-1 border rounded mb-1"/>
                <input placeholder="Title" value={t.title} onChange={e=>updateTeacher(i,'title',e.target.value)} className="w-full px-2 py-1 border rounded mb-1"/>
                <textarea placeholder="Description" value={t.description} onChange={e=>updateTeacher(i,'description',e.target.value)} className="w-full px-2 py-1 border rounded mb-1"/>
                <input placeholder="Focus Areas" value={t.focus_areas} onChange={e=>updateTeacher(i,'focus_areas',e.target.value)} className="w-full px-2 py-1 border rounded mb-1"/>
                <input type="file" accept="image/jpeg,image/png,image/gif" onChange={e=>handleTeacherImageChange(i,e)} />
                {t.preview && <img src={t.preview} alt="Teacher" className="max-w-xs mt-1 rounded"/>}
                <button type="button" onClick={()=>removeTeacher(i)} className="text-red-600 mt-1">Remove Teacher</button>
              </div>
            ))}
            <button type="button" onClick={addTeacher} className="bg-blue-500 text-white px-3 py-1 rounded">Add Teacher</button>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">FAQs</h2>
            {faqs.map((cat,i)=>(
              <div key={i} className="mb-4 p-2 border rounded">
                <input placeholder="Category" value={cat.category} onChange={e=>updateFaqCategory(i,e.target.value)} className="w-full px-2 py-1 border rounded mb-1"/>
                {cat.faqs.map((q,j)=>(
                  <div key={j} className="mb-2 pl-2 border-l-2 border-gray-300">
                    <input placeholder="Question" value={q.question} onChange={e=>updateFaqInCategory(i,j,'question',e.target.value)} className="w-full px-2 py-1 border rounded mb-1"/>
                    <textarea placeholder="Answer" value={q.answer} onChange={e=>updateFaqInCategory(i,j,'answer',e.target.value)} className="w-full px-2 py-1 border rounded mb-1"/>
                    <button type="button" onClick={()=>removeFaqFromCategory(i,j)} className="text-red-600">Remove FAQ</button>
                  </div>
                ))}
                <button type="button" onClick={()=>addFaqToCategory(i)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Add FAQ</button>
                <button type="button" onClick={()=>removeFaqCategory(i)} className="text-red-600">Remove Category</button>
              </div>
            ))}
            <button type="button" onClick={addFaqCategory} className="bg-blue-500 text-white px-3 py-1 rounded">Add FAQ Category</button>
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" disabled={uploading} className="bg-indigo-600 text-white px-4 py-2 rounded">{uploading ? (isEdit ? 'Updating...' : 'Uploading...') : (isEdit ? 'Update Retreat' : 'Add Retreat')}</button>
            <button type="button" onClick={handleReset} className="bg-gray-200 px-4 py-2 rounded">Reset</button>
          </div>
        </form>
      </div>
      
    </div>
  );
}