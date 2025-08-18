import { Modal } from "@mdm/ui";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { SignInForm } from "./sign-in-form";
import { Button } from "@mdm/ui"
import { SignUpForm } from "./sign-up-form";
import { ResetPasswordForm } from "./reset-password-form";
import Link from "next/link";
import { EmailVerificationForm } from "./email-verification-form";
import { useRouter } from "next/navigation";

type FormType = 'sign-in' | 'sign-up' | 'reset-password' | 'email-verification';

const AuthModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter()
  const [formType, setFormType] = useState<FormType>('sign-in')
  const [email, setEmail] = useState<string>('')
  const [accessToken, setAccessToken] = useState<string>('')

  const onFormToggle = (type: string) => {
    setFormType(type as FormType);
  }

  const verifyEmail = (email: string, accessToken: string) => {
    setEmail(email)
    setAccessToken(accessToken)
    setFormType('email-verification')
  }

  const login = () => {
    localStorage.setItem('access_token', accessToken);
    document.cookie = `access_token=${accessToken}`;
    router.push('/')
    window.location.reload()
  }

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="/">
            <Image
              src="/logomark.png"
              alt="MMC logo"
              width={55}
              height={55}
              className="mr-2 rounded-sm"
            ></Image>
          </a>

          <>
            {/* Title */}
            <h3 className="font-display text-2xl font-bold">
              {formType === 'sign-in' && 'Log In'}
              {formType === 'sign-up' && 'Sign up'}
              {formType === 'reset-password' && 'Reset your password'}
              {formType === 'email-verification' && 'Verify your account'}
            </h3>

            <div className="w-full space-y-5">
              {/* Body */}
              {formType === 'sign-in' && (
                <>
                  <SignInForm className="w-full" verifyEmail={verifyEmail} /> 
                  <p className="w-full text-sm text-muted-foreground text-center">
                    <Link href="/" className="underline underline-offset-4 hover:text-primary" onClick={() => setFormType('reset-password')}>
                      Forgotten password?
                    </Link>
                  </p>
                </>
              )
              }
              {formType === 'sign-up' && <SignUpForm className="w-full"/> }
              {formType === 'reset-password' && <ResetPasswordForm className="w-full" /> }
              {formType === 'email-verification' && <EmailVerificationForm className="w-full" email={email} login={login} /> }
              
              {/* Footer */}
              <p className="w-full text-sm text-muted-foreground">
                {formType === 'sign-in' && `Don't have an account?` }
                {formType === 'sign-up' && 'Already have an account?' }
                
                <Button
                  variant="link"
                  onClick={() => onFormToggle((formType === 'sign-in') ? 'sign-up' : 'sign-in')}
                  className="underline underline-offset-4 hover:text-primary text-blue-500"
                >
                  {formType === 'sign-in' && 'Create an account' }
                  {formType === 'sign-up' && 'Log In' }
                </Button>
              </p>
            </div>
          </>
        </div>
      </div>
    </Modal>
  );
};

export function useAuthModal() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const AuthModalCallback = useCallback(() => {
    return (
      <AuthModal
        showSignInModal={showAuthModal}
        setShowSignInModal={setShowAuthModal}
      />
    );
  }, [showAuthModal, setShowAuthModal]);

  return useMemo(
    () => ({ setShowAuthModal, AuthModal: AuthModalCallback }),
    [setShowAuthModal, AuthModalCallback],
  );
}
