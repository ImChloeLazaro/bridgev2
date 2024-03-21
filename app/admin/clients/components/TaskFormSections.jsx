import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Divider, Select, SelectItem, Chip, Avatar } from "@nextui-org/react";
import {
  clientListAtom,
  processorListAtom,
  reviewerListAtom,
  selectedProcessorAtom,
  selectedReviewerAtom,
} from "@/app/store/TaskStore";
import { useAtom, useAtomValue } from "jotai";
import { selectedClientAtom } from "@/app/store/ClientStore";

const TaskFormSections = () => {
  const clientList = useAtomValue(clientListAtom);
  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);

  const processorList = useAtomValue(processorListAtom);
  const [selectedProcessor, setSelectedProcessor] = useAtom(
    selectedProcessorAtom
  );

  const reviewerList = useAtomValue(reviewerListAtom);
  const [selectedReviewer, setSelectedReviewer] = useAtom(selectedReviewerAtom);

  const handleClientSelectionChange = (key) => {
    setSelectedClient(key);
  };
  const handleProcessorSelectionChange = (key) => {
    setSelectedProcessor(key);
  };
  const handleReviewerSelectionChange = (key) => {
    setSelectedReviewer(key);
  };

  return (
    <>
    {/* Description */}
      <div className="mt-2 mb-12 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Description"}</p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col gap-6">
          {/* Client */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-normal w-24">{"Client"}</p>
            <Select
              aria-label="Client Selection"
              items={clientList}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Select Client/s"
              selectedKeys={selectedClient}
              onSelectionChange={(key) => handleClientSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedClient(() =>
                            Array.from(selectedClient).filter(
                              (item) => item !== displayItem.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-sm">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(client) => (
                <SelectItem key={client.key} textValue={client.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={client.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={client.picture}
                    />
                    <span className="text-small">{client.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Processor */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-normal w-24">{"Processor"}</p>
            <Select
              aria-label="Processor Selection"
              items={processorList}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Assign Processor/s"
              selectedKeys={selectedProcessor}
              onSelectionChange={(key) => handleProcessorSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedProcessor(() =>
                            Array.from(selectedClient).filter(
                              (item) => item !== displayItem.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-sm">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(processor) => (
                <SelectItem key={processor.key} textValue={processor.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={processor.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={processor.picture}
                    />
                    <span className="text-small">{processor.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Reviewer */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-normal w-24">{"Reviewer"}</p>

            <Select
              aria-label="Reviewer Selection"
              items={reviewerList}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Assign Reviewer/s"
              selectedKeys={selectedReviewer}
              onSelectionChange={(key) => handleReviewerSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedReviewer(() =>
                            Array.from(selectedClient).filter(
                              (item) => item !== displayItem.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-sm">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(reviewer) => (
                <SelectItem key={reviewer.key} textValue={reviewer.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={reviewer.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={reviewer.picture}
                    />
                    <span className="text-small">{reviewer.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      </div>

{/* Duration */}
      <div className="mt-2 mb-12 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Duration"}</p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col gap-6">
          {/* Client */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-normal w-24">{"Client"}</p>
            <Select
              aria-label="Client Selection"
              items={clientList}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Select Client/s"
              selectedKeys={selectedClient}
              onSelectionChange={(key) => handleClientSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedClient(() =>
                            Array.from(selectedClient).filter(
                              (item) => item !== displayItem.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-sm">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(client) => (
                <SelectItem key={client.key} textValue={client.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={client.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={client.picture}
                    />
                    <span className="text-small">{client.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Processor */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-normal w-24">{"Processor"}</p>
            <Select
              aria-label="Processor Selection"
              items={processorList}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Assign Processor/s"
              selectedKeys={selectedProcessor}
              onSelectionChange={(key) => handleProcessorSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedProcessor(() =>
                            Array.from(selectedClient).filter(
                              (item) => item !== displayItem.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-sm">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(processor) => (
                <SelectItem key={processor.key} textValue={processor.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={processor.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={processor.picture}
                    />
                    <span className="text-small">{processor.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Reviewer */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-normal w-24">{"Reviewer"}</p>

            <Select
              aria-label="Reviewer Selection"
              items={reviewerList}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Assign Reviewer/s"
              selectedKeys={selectedReviewer}
              onSelectionChange={(key) => handleReviewerSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedReviewer(() =>
                            Array.from(selectedClient).filter(
                              (item) => item !== displayItem.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-sm">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(reviewer) => (
                <SelectItem key={reviewer.key} textValue={reviewer.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={reviewer.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={reviewer.picture}
                    />
                    <span className="text-small">{reviewer.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      </div>
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </>
  );
};

export default TaskFormSections;
