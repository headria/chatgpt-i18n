import React, { Fragment } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export interface IDropdownSelectOption {
    label: string;
    value: string;
    symbol?: string;
    default?: boolean;

    disabled?: boolean;
}
interface IDropdownSelectProps {
    options?: IDropdownSelectOption[];
    selectedKey: string;
    onSelect?: (value: string) => void;
    placeholder?: string;
    className?: string;
    buttonClassName?: string;
}
const DropdownSelect: React.FC<IDropdownSelectProps> = (props) => {
    const { options = [], selectedKey, onSelect, placeholder = "Select an option", className, buttonClassName } = props;

    const [search, setSearch] = React.useState("");

    const filteredOptions = options.filter(
        (option) =>
            option.label.toLowerCase().includes(search.toLowerCase()) ||
            (option.symbol && option.symbol.toLowerCase().includes(search.toLowerCase()))
    );

    const selectedItem = options.find((op) => op.value === selectedKey);

    let rootClassName = "relative";
    let btnComputedClassName =
        "relative cursor-default text-xs rounded-lg bg-white dark:bg-zinc-900 px-2.5 py-2 pr-10 text-left border border-gray-200 dark:border-gray-700 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 truncate";
    if (buttonClassName) {
        btnComputedClassName = btnComputedClassName + " " + buttonClassName;
    }
    if (className) {
        rootClassName = rootClassName + " " + className;
    }
    return (
        <Listbox
            value={selectedKey}
            onChange={(newKey) => {
                onSelect && onSelect(newKey);
            }}
        >
            <div className={rootClassName}>
                <Listbox.Button className={btnComputedClassName}>
                    <span className="block truncate dark:text-white">{selectedItem?.label || ""}</span>
                    {selectedItem === undefined && <span className="block truncate text-gray-400">{placeholder}</span>}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredOptions.map((op, opIndex) => (
                            <Listbox.Option
                                key={op.value}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-700 dark:text-indigo-50"
                                            : "text-gray-900 dark:text-gray-50"
                                    }`
                                }
                                value={op.value}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                            {op.label} {op.symbol}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default DropdownSelect;
