import { Typography } from "@mui/material";
import axios from "axios";
import config from "../../config/config";
import { useMutation, useQuery } from "react-query";
import { getErrorMessage } from "../../utils/displayError";
import { doesUserHasAWallet } from "../../features/wallets/services/doesUserHasAWallet";
import WalletDoesNotExistComponent from "../../features/wallets/wallet-viewing/WalletDoesNotExistComponent";
import ExistingWalletComponent from "../../features/wallets/wallet-viewing/ExistingWalletComponent";
import { Wallet } from "../../types/Wallet";

async function validatePin(pinCode: string) {
  await axios.post(`${config.API_URL}/patients/validate-wallet-pin-code`, {
    pinCode,
  });
}
async function getWalletDetails(): Promise<Wallet> {
  const response = await axios.get(`${config.API_URL}/patients/wallets`);
  return response.data;
}

const ViewWallet: React.FC = () => {
  const getWalletDetailsQuery = useQuery(["wallets"], getWalletDetails, {
    retry: 1,
  });

  const validatePinMutation = useMutation(validatePin, {
    onSuccess: () => getWalletDetailsQuery.refetch(),
  });

  const doesWalletExistsQuery = useQuery(
    ["doesWalletExist"],
    doesUserHasAWallet("/patients/wallets/exists")
  );

  const exists = doesWalletExistsQuery.data;
  if (doesWalletExistsQuery.isLoading) return <></>;
  return (
    <>
      {exists ? (
        <ExistingWalletComponent
          getWalletDetailsQuery={getWalletDetailsQuery}
          validatePinMutation={validatePinMutation}
        />
      ) : (
        <WalletDoesNotExistComponent walletCreationLink="/patient/wallet/create" />
      )}
      {doesWalletExistsQuery.isError && (
        <Typography variant="body2" color="error">
          {getErrorMessage(doesWalletExistsQuery.error)}
        </Typography>
      )}
    </>
  );
};

export default ViewWallet;
