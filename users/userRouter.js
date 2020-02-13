// router imports
const express = require('express');
// bring in the data
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
// start the router 
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body

  Users.insert(newUser).then((resource) => {
    res.status(200).json(resource)
  }).catch((error) => {
    res.status(500).json({message:"request could not be complete."})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params
  const newPost = {...req.body, user_id : id}

  Posts.insert(newPost).then((post) => {
    res.status(200).json(post)
  }).catch((error) => {
    res.status(500).json({message:"request could not be completed."})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get().then((resources) => {
    res.status(200).json(resources)
  }).catch((error) => {
    res.status(500).json({ message:"request could not be completed." })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Users.getById(id).then((user) => {
    res.status(200).json(user)
  }).catch((error) => {
    res.status(500).json({message:"request could not be completed."})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params

  Users.getUserPosts(id).then((posts) => {
    res.status(200).json(posts)
  }).catch((error) => {
    res.status(500).json({message:"request could not be completed."})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  const updatedUser = req.body
  
if (req.body.name) {
  Users.update(id, updatedUser).then((num) => {
    res.status(200).json(num)
  }).catch((error) => {
    res.status(500).json({message:"request could not be completed."})
  })
} else {
  res.status(400).json({message:"Please provide a name."})
}

//   if (req.body.name) {
//   Users.update(id, updatedUser).then((num) => {
//     if (num === 0) {
//       res.status(404).json({message:"The user with this id could not be found."})
//     } else {
//       res.status(200).json(num)
//     }
//   }).catch((error) => {
//     res.status(500).json({ message:"request could not be completed." })
//   })
// } else {
//   res.status(400).json({ message:"Please provide a name for the user." })
// }
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params

  Users.getById(id).then((user) => {
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({message:"A user with this id could not be found."})
    }
  }).catch((error) => {
    res.status(500).json({message:"request could not be completed"})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  // const user = req.body
  // if (!req.body) {
  //   res.status(400).json({message:"missing user data"})
  // } else if (!req.body.name) {
  //   res.status(400).json({message:"missing required text field"})
  // } else {
  //   Users.insert().then((newUser) => {
  //     req.body = newUser
  //     next()
  //   }).catch((error) => {
  //     res.status(500).json({message:"request did not work."})
  //   })
  // }
  if (!req.body) {
    res.status(400).json({message:"missing user data."})
  } else if (!req.body.name) {
    res.status(400).json({message:"missing required text field."})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message:"missing post data."})
  } else if (!req.body.text) {
    res.status(400).json({message:"missing post text."})
  } else {
    next()
  }
}

module.exports = router;
