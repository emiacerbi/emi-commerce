type Item = {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  
  type Props = {
    items: Item[];
  };
  
const MercadoPagoButton: React.FC<Props> = ({ items }) => {
  const handlePayment = async () => {
    const res = await fetch("/api/mercadopago/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });
  
    const data = await res.json();
  
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("Error initiating payment");
    }
  };
  
  return (
    <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 rounded-md">
      Pagar con MercadoPago
    </button>
  );
};

export default MercadoPagoButton
  