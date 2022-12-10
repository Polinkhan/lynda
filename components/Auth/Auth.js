import { Button, Center, Input, Text, VStack } from "native-base";
import { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import { getCache, saveCache } from "../../functions/cacheUpdate";

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isAuth, signIn, signOut } = useDataContext();

  const handleSave = () => {
    signIn({ email, password });
  };

  const handleLogOut = () => {
    signOut();
  };

  return (
    <VStack flex={1} justifyContent={"center"} space={4} p={8}>
      <Center>{}</Center>
      <Center>{isAuth && <Text>You are authenticated</Text>} </Center>
      <Input
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={handleSave}>Submit</Button>
      <Button onPress={handleLogOut}>Logout</Button>
    </VStack>
  );
};

export default Auth;
