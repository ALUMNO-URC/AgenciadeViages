import { LoginDTO } from "../../commons/dto/logindto";
import { Usuario } from "../../commons/entidade/usuario";
import { UsuarioService } from "../usuario/usuarioservice"

describe("Serviço de Usuários", () => {
    var service: UsuarioService;

    var usuarioMock: Usuario = {
        nome: "Hitallo",
        cpf: "43588683046",
        email: "hcs3@cin.ufpe.br",
        senha: "teste",
        tipo: "CLIENTE"
    };

    var usuarioMockErroEmail: Usuario = {
        nome: "Hitallo",
        cpf: "04993984081",
        email: "hcs3@cin.ufpe.br",
        senha: "teste",
        tipo: "CLIENTE"
    };

    var loginDTOValido: LoginDTO = {
        email: "hcs3@cin.ufpe.br",
        senha: "teste"
    };

    var loginDTOEmailNaoCadastrado: LoginDTO = {
        email: "hcs34@cin.ufpe.br",
        senha: "teste"
    }

    var loginDTOSenhaInvalida: LoginDTO = {
        email: "hcs3@cin.ufpe.br",
        senha: "testeErro"
    }

    beforeEach(() => service = new UsuarioService());

    it("Não possui registro de usuários", () => {
        expect(service.buscarTodos().length).toBe(0);
    });

    it("Cadastra Usuário com sucesso", () => {
        service.cadastrar(usuarioMock);

        expect(service.buscarTodos().length).toBe(1);

        var usuarioCadastrado = service.buscarTodos()[0];

        expect(usuarioCadastrado.email).toBe(usuarioMock.email);
        expect(usuarioCadastrado.cpf).toBe(usuarioMock.cpf);
        expect(usuarioCadastrado.senha).toBe(usuarioMock.senha);
        expect(usuarioCadastrado.tipo).toBe(usuarioMock.tipo);
        expect(usuarioCadastrado.nome).toBe(usuarioMock.nome);
    });

    it("Erro de email já cadastrado", () => {
        service.cadastrar(usuarioMock);
        expect(function () {
            service.cadastrar(usuarioMockErroEmail)
        }).toThrowError("E-mail já cadastrado no sistema");
    });

    it("Erro de CPF já cadastrado", () => {
        service.cadastrar(usuarioMock);
        expect(function () {
            service.cadastrar(usuarioMock)
        }).toThrowError("Cpf já cadastrado no sistema.");
    });

    it("Login inválido", () => {
        service.cadastrar(usuarioMock);
    });

    it("Deve realizar login com sucesso", () => {
        service.cadastrar(usuarioMock);

        var login = service.login(loginDTOValido);

        expect(login.cpf).toBe(usuarioMock.cpf);
        expect(login.email).toBe(usuarioMock.email);
        expect(login.senha).toBe(usuarioMock.senha);
        expect(login.tipo).toBe(usuarioMock.tipo);
        expect(login.nome).toBe(usuarioMock.nome);
    })

    it("Deve disparar Erro quando login com e-mail invalido", () => {
        service.cadastrar(usuarioMock);
        
        expect(function() {
            service.login(loginDTOEmailNaoCadastrado)
        }).toThrowError("Não existe cadastro com o e-mail enviado.")
    })

    it("Deve disparar Erro quando login com SENHA invalida", () => {
        service.cadastrar(usuarioMock);
        
        expect(function() {
            service.login(loginDTOSenhaInvalida)
        }).toThrowError("Senha inválida.")
    })

})