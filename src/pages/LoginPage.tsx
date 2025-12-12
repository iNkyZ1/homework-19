import { useState } from "react";
import { TextInput, Button, Paper, Title, Stack, Center } from "@mantine/core";
import { useAuth } from "@/features/auth/model/useAuth";

function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login();
      setLoading(false);
    }, 300);
  };

  return (
    <Center h="100vh">
      <Paper withBorder radius="md" p="lg" w={320}>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Title order={3} ta="center">
              Вход
            </Title>

            <TextInput label="Логин" placeholder="Введите логин" required />

            <TextInput
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              required
            />

            <Button type="submit" loading={loading} fullWidth>
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}

export default LoginPage;
