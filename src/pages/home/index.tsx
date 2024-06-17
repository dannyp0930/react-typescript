import useStore from '@/store';

export default function Home() {
  const store = useStore();
  return <article>{store.username}, Hello World!</article>;
}
