// src/Components/UserLookup.js
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import "./styles/login.css";

const users = [
  { username: "veena", email: "veena@example.com", phone: "9441032511" },
  { username: "keerthi", email: "keerthisekhar2003@example.com", phone: "9100692511" },
  { username: "Nirupama", email: "nirupama@example.com", phone: "9490595891" },
];

const UserLookup = () => {
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const foundUser = users.find((user) => user.username === username);
    if (foundUser) {
      setUserDetails(foundUser);
      setNotFound(false);
    } else {
      setUserDetails(null);
      setNotFound(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">User Lookup</h2>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {userDetails && (
        <Card className="p-4 w-96">
          <CardContent>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
          </CardContent>
        </Card>
      )}

      {notFound && <p className="text-red-500">User not found.</p>}
    </div>
  );
};

export default UserLookup;
