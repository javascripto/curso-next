# Iniciando

```zsh
yarn create next-app "curso-next" && cd "curso-next"
yarn add -D typescript @types/node @types/react

# rename .js to .tsx
find ./pages -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.tsx"' {} \;

# move pages to src
mkdir src && mv ./pages ./src/

# run project
yarn dev

# styled components com next
yarn add styled-components && yarn add -D @types/styled-components
mkdir -p src/styles/pages
touch src/styles/{Global.ts,/pages/Home.ts}

# ssr config for styled-components
# https://styled-components.com/docs/advanced#nextjs
yarn add -D babel-plugin-styled-components
touch babel.config.js src/pages/_document.tsx

# add code for _document.tsx from doc example

echo $(cat << EOF
module.exports = {\n
  preset: ['next/babel'],\n
  plugins: [['styled-components', { ssr: true }]],\n
};
EOF
) > babel.config.js


```

## getServerSideProps x getStaticProps x getStaticPaths

- getServerSideProps processa algo no servidor toda vez que a pagina é requisitada (SSR). Pode gerar gargalos caso o processamento demore muito.
- getStaticProps (SSG) gera paginas estaticas. No ambiente de desenvolvimento isso não acontece, apenas em produção. para testar mode de produção gere um build e depois execute com `yarn build && yarn start`.
o getStaticProps pode receber uma configuração de revalidate para gerar novamente a pagina estática em produção no momento de uma nova requisição. A propriedade revalidate recebe um valor numerico em segundos
- Quando se está construindo paginas estaticas numa pagina com url dinamica com parametros, é necessário informar os possiveis paths ou pelo menos os principais para geração estatica. Isso é feito com a função getStaticPaths em conjunto com a getStaticProps. A getStaticPaths tem um parametro chamado fallback que quando recebe o valor true. Ele tenta gerar paginas não mapeadas nos paths ao tentar acessar a nova página. Ao utaz a opão de fallback como true, o useRouter passa a ter uma propriedade isFallback para tratamento de vizualização da pagina enquanto a mesma está sendo gerada pela primeira vez. a propriedade paths também pode ser um array vazio para que todas paginas sejam geradas dinamicamente na primeira vez e depois servidas de forma estática

##

- a pasta pages pode estar na raiz ou em src apenas
- A renderização do styled components no server precisa de uma configuração de plugin do babel e uma configuração em pages/_documents.tsx
- Para usar rotas com parametros com id ou slug por exemplo, usamos um arquivo nomeado entre colchetes: ex: `pages/produts/[slug].tsx`. O slug representa uma string na url recuperada pelo objeto Router.useRouter().query do pacote `next/router`
- TTFB = Time to first byte
- Os parametros podem ser obtidos no componente de pagina com o useRouter ou a partir do contexto do useStaticProps, a query representa tanto parametros de rotas quando queryparams

##
- página 404
- import dinâmico para poupar o build da pagina no server. import denamico de funções e de componentes tambem com next/dynamic 
- .env na raiz .env.local fica só para voce localmente e não vai para o github
  - o arquivo .env fica na raiz do projeto juntamente com o diretorio public
  - você pode ter arquivos .env .env.development .env.production e .env.test para diferenciar os ambientes
  - caso não queira compartilhar alguma das variaveis de ambiente para outras pessoas e manter apenas localmente, use um .env.local que já está incluso no .gitignore
  - Variaveis de ambiente contem dados sensiveis e só estão disponiveis nas funções do server como getStaticProps e getServerSideProps
  - Se uma variavel de ambiente puder ser exposta como publica o nome dela deve ser prefixado com NEXT_PUBLIC

## Paths do typescript
  - Abra o tsconfig.json e configure duas propriedades: baseUrl e paths para configurar caminhos de importação personalizados
  ```json
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    },
  ```

## SEO