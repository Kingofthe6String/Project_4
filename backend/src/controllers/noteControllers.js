import Note from "../models/Note";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller");
    res.status(500).json({ message: "internal server error" });
  }
}
export function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, conetent: content });

    await newNote.save()
    res.status(201).json({message: "Note created succesfully"})

  } catch (error) {}
}

export function updateNote(req, res) {
  res.status(200).json({ message: "note update success" });
}

export function deleteNote(req, res) {
  res.status(200).json({ message: "note delete success" });
}
