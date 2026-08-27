import { FormRegister } from '../module/auth/components/FormRegister';
import { GoBackLink } from "../module/core/ui/GoBackLink";

const elementoAzar = () => {
	const array = [1, 2, 3, 4]
	const indice = Math.floor(Math.random() * array.length);
	return array[indice];
}

/**
 * Pantalla de registro - usa FormRegister que coincide con el diseño de FormLogin
 */
export const SignUp = () => {
  const randomNumber = elementoAzar()
    return (
      <main
        className={`flex flex-col items-center w-full min-h-screen overflow-y-auto justify-center py-4 ${randomNumber === 1
          ? 'bg-[center_right_-30rem] bg-login1'
          : randomNumber === 2
            ? 'bg-[center_right_-15rem] bg-login2'
            : randomNumber === 3
              ? 'bg-[center_right_-55rem] bg-login3'
              : 'bg-[center_right_-55rem] bg-login4'
          } bg-no-repeat bg-cover bg-[center_right_-10rem] sm:bg-[center_top_.01rem]`}
      >
        <div className="absolute top-6 left-6">
                  <GoBackLink color={'color-black'} label={''} />
              </div>
        <FormRegister />
      </main>
    )
};

export default SignUp;