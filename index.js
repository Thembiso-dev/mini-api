const express = require('express');
const supabase = require('./supabaseClient');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /tasks
app.get('/tasks', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// POST /tasks
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
});

// PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;

  const { data, error } = await supabase
    .from('tasks')
    .update({ title })
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: `Task ${id} deleted` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
