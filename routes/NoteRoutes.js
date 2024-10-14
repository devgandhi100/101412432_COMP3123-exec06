const express = require("express");
const router = express.Router();
const noteModel = require("./models/NotesModel.js");

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post("/notes", (req, res) => {
  // Validate request
  // updated - req.body.content does not exist in my json
  // so instead we look for title or description
  if (!req.body.noteTitle || !req.body.noteDescription) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  //TODO - Write your code here to save the note
  const newNote = new noteModel({
    noteTitle: req.body.noteTitle,
    noteDescription: req.body.noteDescription,
    priority: req.body.priority,
  });

  newNote
    .save()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get("/notes", (req, res) => {
  // Validate request
  // not needed
  //   if (!req.body.noteTitle || !req.body.noteDescription) {
  //     return res.status(400).send({
  //       message: "Note content can not be empty",
  //     });
  //   }

  //TODO - Write your code here to returns all note
  noteModel
    .find()
    .then((notes) => res.send(notes))
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get("/notes/:noteId", (req, res) => {
  // Validate request
  //   if (!req.body.noteTitle || !req.body.noteDescription) {
  //     return res.status(400).send({
  //       message: "Note content can not be empty",
  //     });
  //   }
  //TODO - Write your code here to return onlt one note using noteid
  noteModel
    .findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: `Note not found with id ${req.params.noteId}`,
        });
      }
      res.send(note);
    })
    .catch((err) =>
      res.status(500).send({
        message: `Error retrieving note with id ${req.params.noteId}`,
      })
    );
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put("/notes/:noteId", (req, res) => {
  // Validate request
  if (!req.body.noteTitle || !req.body.noteDescription) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  //TODO - Write your code here to update the note using noteid
  noteModel
    .findByIdAndUpdate(
      req.params.noteId,
      {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now(),
      },
      { new: true }
    )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: `Note not found with id ${req.params.noteId}`,
        });
      }
      res.send(note);
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: `Error updating note with id ${req.params.noteId}` })
    );
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete("/notes/:noteId", (req, res) => {
  // Validate request
  //   if (!req.body.content) {
  //     return res.status(400).send({
  //       message: "Note content can not be empty",
  //     });
  //   }
  //TODO - Write your code here to delete the note using noteid
  noteModel
    .findByIdAndDelete(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res
          .status(404)
          .send({ message: `Note not found with id ${req.params.noteId}` });
      }
      res.send({ message: "Note deleted successfully" });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: `Could not delete note with id ${req.params.noteId}` })
    );
});

module.exports = router;
