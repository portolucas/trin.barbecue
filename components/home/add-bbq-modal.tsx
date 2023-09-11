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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Barbecue } from "@prisma/client";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import styles from "../../app/base.module.css";
import cx from "classnames";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddBbqModal = ({
  showAddBbqModal,
  setShowAddBbqModal,
}: {
  showAddBbqModal: boolean;
  setShowAddBbqModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  interface AddBbqValues extends Partial<Barbecue> {}
  const initialAddBbqValues: AddBbqValues = {
    name: "",
    description: "",
    observation: "",
    date: new Date(),
  };

  const handleSubmit = async (values: AddBbqValues) => {
    setLoading(true);
    try {
      await fetch("/api/barbecue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          date: values.date,
          ownerId: session?.user?.id,
        }),
      }).then(() => {
        setLoading(false);
        setShowAddBbqModal(false);
        router.refresh();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowAddBbqModal(false);
    }
  };

  return (
    <Modal showModal={showAddBbqModal} setShowModal={setShowAddBbqModal}>
      <div className="w-full overflow-hidden bg-white md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="w-full overflow-hidden shadow-xl md:max-w-md">
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
            <h3 className="font-display text-2xl font-bold">Agendar Churras</h3>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3  px-4 py-6 pt-8 text-center md:px-16">
            <Formik
              initialValues={initialAddBbqValues}
              onSubmit={async (values: AddBbqValues) => {
                await handleSubmit(values);
              }}
            >
              {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form>
                  <TextField
                    style={{ padding: 10 }}
                    type="text"
                    label="Título"
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
                    label="Descrição"
                    id="filled-basic"
                    variant="filled"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    size="small"
                  />
                  <TextField
                    style={{ padding: 5 }}
                    label="Observação"
                    id="filled-basic"
                    variant="filled"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="small"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      style={{ padding: 5 }}
                      label="Data"
                      variant="filled"
                      id="filled-basic"
                      name="date"
                      onChange={(value) => {
                        setFieldValue("date", value?.toDate());
                      }}
                      onBlur={handleBlur}
                      value={dayjs(values?.date)}
                      size="small"
                    />
                  </LocalizationProvider>

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
      </div>
    </Modal>
  );
};

export function useAddBbqModal() {
  const [showAddBbqModal, setShowAddBbqModal] = useState(false);

  const AddBbqModalCallback = useCallback(() => {
    return (
      <AddBbqModal
        showAddBbqModal={showAddBbqModal}
        setShowAddBbqModal={setShowAddBbqModal}
      />
    );
  }, [showAddBbqModal, setShowAddBbqModal]);

  return useMemo(
    () => ({ setShowAddBbqModal, AddBbqModal: AddBbqModalCallback }),
    [setShowAddBbqModal, AddBbqModalCallback],
  );
}
