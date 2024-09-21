import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link } from "@nextui-org/react";
import { MailIcon } from "../../public/MailIcon";
import { LockIcon } from "../../public/LockIcon";

export default function Signup({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
          <Input
            endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            variant="bordered"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Sign Up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
