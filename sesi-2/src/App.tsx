import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfileImageUpload from './components/ProfileImageUpload';
import ContactForm from './ContactForm';

function App() {
  return (
    <main className="space-y-10 p-6 bg-gray-100">
      <LoginForm />

      <ContactForm />

      <RegisterForm />

      <ProfileImageUpload />
    </main>
  );
}

export default App;