import { useState } from "react";
import { Box, Input, Button } from "@droak/wterm";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <Box title="login" double>
        <Input label="username" value={username} onChange={setUsername} placeholder="visitor" />
        <br />
        <Input label="password" value={password} onChange={setPassword} placeholder="********" type="password" />
        <br />
        <Button label="sign in" onSelect={() => {}} />
      </Box>
    </div>
  );
}
