import AuthButton from "./AuthButton";

export default async function Navbar() {
  return (
    <nav className="flex gap-4 py-2 border-b border-b-gray-500">
      <p>
        11 1111-1111
      </p>
      <p>
        emi-commerce@gmail.com
      </p>
      <AuthButton />
    </nav>
  )
}	