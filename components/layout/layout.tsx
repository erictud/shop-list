import Navigation from "./nav";

export default function Layout(props: any) {
  return (
    <>
      <Navigation />
      {props.children}
    </>
  );
}
