// router imports
const express = require('express');
// bring in the data
const Users = require('./userDb.js');
// start the router 
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get().then((resources) => {
    res.status(200).json(resources)
  }).catch((error) => {
    res.status(500).json({ message:"request could not be completed." })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params

  Users.getById(id).then((resource) => {
    if (resource) {
      res.status(201).json(resource)
    } else {
      res.status(404).json({ message:"A user with this id could not be found." })
    }
  }).catch((error) => {
    res.status(500).json({ message:"request could not be completed." })
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const { id } = req.params

  Users.getById(id).then((resource) => {
    if (resource) {
      Users.getUserPosts(id).then((posts) => {
        if (posts.length === 0) {
          res.status(299).json({message:"This user does not have any posts."})
        } else {
          res.status(201).json(posts)
        }
      }).catch((error) => {
        res.status(500).json({message:"The user exists but the user's posts could not be retrieved."})
      })
    } else {
      res.status(404).json({message:"A user with this id could not be found"})
    }
  }).catch((error) => {
    res.status(500).json({message:"request could not be completed."})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params

  Users.remove(id).then((num) => {
    if (num === 0) {
      res.status(404).json({message:"The user with this id could not be found."})
    } else {
      res.status(200).json(num)
    }
  }).catch((error) => {
    res.status(500).json({message:"request could not be completed."})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params
  const updatedUser = req.body

  if (req.body.name) {
  Users.update(id, updatedUser).then((num) => {
    if (num === 0) {
      res.status(404).json({message:"The user with this id could not be found."})
    } else {
      res.status(200).json(num)
    }
  }).catch((error) => {
    res.status(500).json({ message:"request could not be completed." })
  })
} else {
  res.status(400).json({ message:"Please provide a name for the user." })
}
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
