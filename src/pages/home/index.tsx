export default function Home() {
  return <article>
    Hello World!
    {process.env.NODE_ENV}
  </article>;
}
