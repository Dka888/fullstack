
import User from "../models/user.js";
import { compareSync, hashSync } from "bcrypt";
import { validationResult } from "express-validator";

const secretKey = 'secret-key';


export async function registerUser(req, res) {
  const { email, password, username } = req.body;

  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(409).json({message: 'Wrong validation'})
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const hashedPassword = hashSync(password, 5);
      const newUser = new User({ email, password: hashedPassword, username });
      await newUser.save();
      res.status(201).json({ message: 'Registration successful' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during registration' });
  }
}

export async function loginUser(req, res) {
    const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }) || await User.findOne({ email: username });

    const isPasswordValid = compareSync(password, user.password)
 
    if (user && isPasswordValid) {

      res.status(200).json({ message: 'Login successful', user});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ error: "Error while fetching user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { NewUsername, password, OldUsername} = req.body;
    
    const user = await User.findOne({username: OldUsername });
    const isUnique = await User.findOne({username: NewUsername});
    const isPasswordValid = compareSync(password, user.password)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(isUnique) {
      return res.status(401).json({message: 'Impossible username'})
    }
    if(!isPasswordValid) {
      return res.status(402).json({message: 'Wrong Validoation'})
    }

    user.username = NewUsername;
    await user.save();
    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: "Error while updating user" });
  }
};

export const updateMail = async (req, res) => {
  try {
    const { NewEmail, password, OldEmail} = req.body;
    const user = await User.findOne({ email: OldEmail });
    const isPasswordValid = compareSync(password, user.password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(!isPasswordValid) {
      return res.status(402).json({message: 'Wrong Validoation'})
    }

    user.email = NewEmail;
    await user.save();
    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: "Error while updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting user" });
  }
};
