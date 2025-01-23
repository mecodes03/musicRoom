import Link from "next/link";

const Page = () => {
  return (
    <Link href="https://invidious.jing.rocks/authorize_token?scopes=GET:playlists*&callback_url=http://localhost:3000/invidious/callback/&expire=36000">
      login with invidious
    </Link>
  );
};

export default Page;
