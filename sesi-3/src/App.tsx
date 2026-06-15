import ContactFormRHF from './components/ContactFormRHF';
import CreatePostForm from './components/CreatePostForm';
import LoginFormRHF from './components/LoginFormRHF';
import PasswordStrengthForm from './components/PasswordStrengthForm';
import RegisterFormRHF from './components/RegisterFormRHF';
import SignupFormRHF from './components/SignupFormRHF';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <LoginFormRHF />
      <SignupFormRHF /> 
      <ContactFormRHF />
      <PasswordStrengthForm />
      <RegisterFormRHF />
      <CreatePostForm />
    </div>
  );
}

export default App;