# Portfólio — Julia Fialho

Site pessoal com projetos, experiência e contato.

**No ar:** https://meu-portifolio-five-jade.vercel.app

## Stack

HTML, CSS e JavaScript puros, sem build. Fontes Geist e Instrument Serif via Google Fonts e formulário de contato via [Web3Forms](https://web3forms.com).

## Estrutura

```
index.html        # conteúdo da página
css/style.css     # tokens de cor, layout e responsivo
js/main.js        # animações de entrada, atalhos dos serviços e envio do formulário
assets/           # foto e capturas das landing pages e projetos
```

## Rodando localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
npx serve .
```

## Adicionando um projeto

Copie um bloco `<article class="project">` dentro da seção `#trabalho` em `index.html` e ajuste título, descrição, `stack` e link. A imagem ou painel vai em `.project-visual`.
