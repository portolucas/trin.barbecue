import { Barbecue, Guest } from "@prisma/client";
import { Session } from "next-auth";

export type ReactChildren = {
  children?: React.ReactNode;
};

export interface IBarbecue extends Barbecue {}
export interface IGuest extends Guest {}

export interface IBarbecueWithGuests extends IBarbecue {
  guests: IGuest[];
}

export type GuestPageParams = { params: { barbecueId: Barbecue["id"] } };

export type AddGuestModalProps = {
  barbecueId: Barbecue["id"];
  callback: () => Promise<void>;
};

export type SessionProps = {
  session: Session | null;
};
