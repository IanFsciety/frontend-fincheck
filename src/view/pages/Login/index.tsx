import { Link } from "react-router-dom";
import { Input } from "../../components/Input";

export function Login() {

  return (
    <div>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>
          <Link className="text-teal-900 font-medium tracking-[-0.5px]" to="/register">
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4">
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha"/>

        <button className="mt-2" type="submit">Entrar</button>

      </form>
    </div>
  );
}
