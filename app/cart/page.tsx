"use client"
import Image from "next/image";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, getTotal, removeFromCart, addToCart, removeOneFromCart } = useCart();

  const total = getTotal()
  const discount = 10

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Tu carrito</h1>
          </header>
          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li className="flex items-center gap-4" key={item.id}>
                  <div
                    className="relative aspect-square w-24 overflow-hidden rounded-sm"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                      sizes="96px"
                      fill
                    />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price * item.quantity}</p>
                    <p className="text-sm text-gray-600">Quedan {item.stock} disponibles</p>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <div className="flex gap-6 items-center justify-center outline px-2 py-1 rounded-sm outline-gray-200">
                      <button className="cursor-pointer" onClick={() => removeOneFromCart(item)}>
                        &minus;
                      </button>
                      <label htmlFor="Line1Qty" className="sr-only "> Quantity </label>
                      <p
                        id="Line1Qty"
                        className="text-sm"
                      >
                        {item.quantity}
                      </p>
                      <button className="cursor-pointer" onClick={() => addToCart(item)}>
                        &#43;
                      </button>
                    </div>
                    <button className="text-gray-600 transition cursor-pointer hover:text-red-600" onClick={() => removeFromCart(item.id)}>
                      <span className="sr-only">Remove item</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
              }
            </ul>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <h2 className="text-lg font-bold text-gray-900">Aún no tienes ningún producto seleccionado</h2>
                <p className="text-sm text-gray-600">Agrega productos a tu carrito para comenzar.</p>
              </div>
            ) : (
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{total}$</dd>
                    </div>
  
                    <div className="flex justify-between">
                      <dt>Descuento</dt>
                      <dt>{discount}$</dt>
                    </div>
  
                    <div className="flex justify-between font-bold">
                      <dt>Total</dt>
                      <dd>{total - discount}$</dd>
                    </div>
                  </dl>
  
                  <div className="flex justify-end">
                    <span
                      className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>
                      <p className="text-xs whitespace-nowrap">1 Descuento Aplicados</p>
                    </span>
                  </div>
  
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Finalizar compra
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

