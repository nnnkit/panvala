import { useState } from 'react';
import ReactDOM from 'react-dom';

import { UseWalletProvider } from 'use-wallet';
import App from './components/app';
import './styles/index.css';

function Widget({ config }) {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const open = () => setIsWidgetOpen(true);
  const close = () => setIsWidgetOpen(false);
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        walletconnect: {
          rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
        },
      }}
    >
      {isWidgetOpen ? (
        <App config={config} open={open} close={close} />
      ) : (
        <div className='flex justify-center items-center py-2'>
          <button
            type='button'
            className='inline-flex items-center px-6 py-2 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700'
            onClick={() => {
              setIsWidgetOpen(true);
            }}
          >
            Donate Now
          </button>
        </div>
      )}
    </UseWalletProvider>
  );
}

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <Widget
      config={{
        defaultAmount: 5,
        toAddress:
          '0x6d0214227c0A521C282215ED2c6b16ADBaEA5ea7',
      }}
    />,
    document.getElementById('app')
  );
}

export function init(config) {
  ReactDOM.render(
    <Widget config={config} />,
    document.getElementById('panWidget')
  );
}
