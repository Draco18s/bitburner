import React, { useState, useEffect } from "react";

import { HashUpgrades } from "../HashUpgrades";

import { Hashes } from "../../ui/React/Hashes";
import { HacknetUpgradeElem } from "./HacknetUpgradeElem";
import { Modal } from "../../ui/React/Modal";
import { Player } from "../../Player";
import Typography from "@mui/material/Typography";

interface IProps {
  open: boolean;
  onClose: () => void;
}

/** Create the pop-up for purchasing upgrades with hashes */
export function HashUpgradeModal(props: IProps): React.ReactElement {
  const setRerender = useState(false)[1];
  function rerender(): void {
    setRerender((old) => !old);
  }

  useEffect(() => {
    const id = setInterval(() => setRerender((old) => !old), 200);
    return () => clearInterval(id);
  }, []);

  const hashManager = Player.hashManager;
  if (!hashManager) {
    throw new Error(`Player does not have a HashManager)`);
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <>
        <Typography>Spend your hashes on a variety of different upgrades</Typography>
        <Typography>
          Hashes: <Hashes hashes={Player.hashManager.hashes} />
        </Typography>
        {Object.keys(HashUpgrades).map((upgName) => {
          const upg = HashUpgrades[upgName];
          return <HacknetUpgradeElem upg={upg} hashManager={hashManager} key={upg.name} rerender={rerender} />;
        })}
      </>
    </Modal>
  );
}
