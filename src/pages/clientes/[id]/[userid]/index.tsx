import * as React from 'react';

import { useRouter } from 'next/router';


const Clientes = () => {
  const router = useRouter()
  const id = router.query.id

  return (
    <div>
      <h1>Detalhes cupom - O que colocar?</h1>
      <h1>id: {id}</h1>
    </div>
  );
}

export default Clientes;