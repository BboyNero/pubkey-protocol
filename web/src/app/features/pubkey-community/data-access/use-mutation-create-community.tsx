import { CreateCommunityOptions } from '@pubkey-protocol/sdk'
import { useMutation } from '@tanstack/react-query'
import { usePubKeyProtocol } from '../../pubkey-protocol'

export type PubKeyCommunityCreateInput = Omit<CreateCommunityOptions, 'authority' | 'feePayer'>

export function useMutationCreateCommunity() {
  const { authority, feePayer, sdk, signAndConfirmTransaction, onError, onSuccess } = usePubKeyProtocol()

  return useMutation({
    mutationFn: (options: PubKeyCommunityCreateInput) =>
      sdk
        .createCommunity({
          ...options,
          avatarUrl: options.avatarUrl || `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${options.slug}`,
          authority,
          feePayer,
        })
        .then(signAndConfirmTransaction),
    onError,
    onSuccess,
  })
}