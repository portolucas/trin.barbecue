"use client";

import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Formik, Form } from "formik";
import { TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Guest } from "@prisma/client";
import styles from "../../app/base.module.css";
import cx from "classnames";
import Image from "next/image";

const AddGuestsModal = ({
  showAddGuestsModal,
  setShowAddGuestsModal,
  barbecueId,
  callback,
}: {
  showAddGuestsModal: boolean;
  setShowAddGuestsModal: Dispatch<SetStateAction<boolean>>;
  barbecueId: string;
  callback: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  interface AddGuestsValues extends Partial<Guest> {}
  const initialAddBbqValues: AddGuestsValues = {
    name: "",
    email: "",
    price: 0,
  };

  const handleSubmit = async (values: AddGuestsValues) => {
    setLoading(true);
    try {
      await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          price: values.price,
          barbecueId,
        }),
      }).then(() => {
        setLoading(false);
        setShowAddGuestsModal(false);
        callback();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowAddGuestsModal(false);
    }
  };

  return (
    <Modal showModal={showAddGuestsModal} setShowModal={setShowAddGuestsModal}>
      <div className="w-full overflow-hidden bg-white md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div
          className={cx(
            styles.background,
            "flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16",
          )}
        >
          <a href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="font-display text-2xl font-bold">
            Adicionar convidado
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3  px-4 py-6 pt-8 text-center md:px-16">
          <Formik
            initialValues={initialAddBbqValues}
            onSubmit={async (values: AddGuestsValues) => {
              await handleSubmit(values);
            }}
          >
            {({ values, handleChange, handleBlur, setFieldValue }) => (
              <Form>
                <TextField
                  style={{ padding: 10 }}
                  type="text"
                  label="Nome"
                  variant="filled"
                  id="filled-basic"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  size="small"
                />
                <TextField
                  style={{ padding: 5 }}
                  label="Email"
                  type="email"
                  id="filled-basic"
                  variant="filled"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  size="small"
                />
                <TextField
                  style={{ padding: 5 }}
                  label="Valor sugerido"
                  id="filled-basic"
                  type="number"
                  variant="filled"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  size="small"
                />

                <div className="mt-3">
                  <LoadingButton
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<SaveIcon />}
                    variant="contained"
                    type="submit"
                    size="small"
                    style={{
                      color: "white",
                      backgroundColor: "#998220",
                      marginTop: 10,
                    }}
                  >
                    Adicionar
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export function useAddGuestsModal() {
  const [showAddGuestsModal, setShowAddGuestsModal] = useState(false);

  const AddGuestsModalCallback = useCallback(
    ({
      barbecueId,
      callback,
    }: {
      barbecueId: string;
      callback: () => void;
    }) => {
      return (
        <AddGuestsModal
          showAddGuestsModal={showAddGuestsModal}
          setShowAddGuestsModal={setShowAddGuestsModal}
          barbecueId={barbecueId}
          callback={callback}
        />
      );
    },
    [showAddGuestsModal, setShowAddGuestsModal],
  );

  return useMemo(
    () => ({ setShowAddGuestsModal, AddGuestsModal: AddGuestsModalCallback }),
    [setShowAddGuestsModal, AddGuestsModalCallback],
  );
}
