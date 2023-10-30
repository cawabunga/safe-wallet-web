import { type ConnectedWallet } from '@/services/onboard'
import { faker } from '@faker-js/faker'
import { Builder, type IBuilder } from '../Builder'
import { eip1193ProviderBuilder } from './eip1193provider'

const walletNames = ['MetaMask', 'Wallet Connect', 'Social Login', 'Rainbow']

export const connectedWalletBuilder = (): IBuilder<ConnectedWallet> => {
  return Builder.new<ConnectedWallet>().with({
    address: faker.finance.ethereumAddress(),
    chainId: faker.string.numeric(),
    ens: faker.string.alpha() + '.ens',
    label: faker.helpers.arrayElement(walletNames),
    provider: eip1193ProviderBuilder().build(),
  })
}