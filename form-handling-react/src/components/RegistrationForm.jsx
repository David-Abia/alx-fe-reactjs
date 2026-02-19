import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!username.trim()) newErrors.username = "Username required";
    if (!email.includes("@")) newErrors.email = "Valid email required";
    if (password.length < 6) newErrors.password = "Password must be 6+ chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log({ username, email, password });
      alert("Form submitted successfully");

      setUsername("");
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}
