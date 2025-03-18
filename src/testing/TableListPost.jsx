import { useState } from "react";
import { postData } from "../api/axios";

const FormTambahAkun = ({ endPointParams }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {

    const newAccount = {
      username,
      email,
      password,
      role,
    };

    try {
      await postData(endPointParams, newAccount);
      alert("Akun berhasil ditambahkan!");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (error) {
      console.error("POST Error:", error);
      alert("Gagal menambahkan akun");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">Tambah Akun</button>
    </form>
  );
};

export default FormTambahAkun;
