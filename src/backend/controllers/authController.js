const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const prisma = req.app.locals.prisma;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "User registered successfully." });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const prisma = req.app.locals.prisma;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  res.status(200).json({ message: "Login successful." });
};

module.exports = { register, login };
