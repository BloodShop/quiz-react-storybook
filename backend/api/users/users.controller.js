/* import UsersDAO from "../dao/usersDAO.js" */

/* const User = require('../models/user'); */
export default class UsersController {
  static async apiPostUser(req, res, next) {
    /* console.log('!!!! inside post');

    const data = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })

    const val = await data.save();
    res.json(val); */

    /* try {
      const restaurantId = req.body.restaurant_id
      const user = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const UserResponse = await UsersDAO.addUser(
        restaurantId,
        userInfo,
        user,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    } */
  }

  /* static async apiUpdateUser(req, res, next) {
    try {
      const userId = req.body.user_id
      const text = req.body.text
      const date = new Date()

      const userResponse = await UsersDAO.updateUser(
        userId,
        req.body.user_id,
        text,
        date,
      )

      var { error } = userResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (userResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update user - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  } */

  static async apiDeleteUser(req, res, next) {
    /* try {
      const userId = req.query.id
      const userId = req.body.user_id
      console.log(userId)
      const userResponse = await UsersDAO.deleteUser(
        userId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    } */
  }

}