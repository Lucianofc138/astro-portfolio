import { useState, useEffect } from "preact/hooks"

import "./InteractiveListWithDetail.css"
import {markdownToHtml} from "../utils";
import type {ListWithDetailRow} from "../types";

const TRANSITION_SECONDS: number = 0.4;

interface InteractiveListWithDetailProps {
    listElements: ListWithDetailRow[];
    primaryLabel: string;
}
export default function InteractiveListWithDetail({
    listElements = [],
    primaryLabel = ""
}: InteractiveListWithDetailProps) {
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(1);

    return (
        <main className="interactive-list-container">
            <div className="interactive-list-header interactive-list-row" >
                <div style="text-align: center">#</div>
                <div>{primaryLabel}</div>
                <div style="text-align: center">
                    <span className="material-icons">
                      calendar_month
                    </span>
                </div>
            </div>
            {listElements.map((row: ListWithDetailRow, index: number) => (
                <InteractiveListWithDetailRow
                    row={row}
                    index={index}
                    isHide={selectedRowIndex !== null && selectedRowIndex !== index}
                    focus={() => {
                        setSelectedRowIndex(index);
                    }}
                    unFocus={() => {
                        setSelectedRowIndex(null);
                    }}
                />
            ))}
            { selectedRowIndex !== null && <RowDetails detail={listElements[selectedRowIndex].detail} links={listElements[selectedRowIndex].links} />}
     </main>
    )
}

interface InteractiveListWithDetailRowProps {
    index: number;
    row: any;
    isHide?: boolean;
    focus?: () => void;
    unFocus?: () => void;
}
function InteractiveListWithDetailRow({
    index,
    row,
    isHide = true,
    focus = () => {},
    unFocus = () => {}
} : InteractiveListWithDetailRowProps ) {

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isLocked, setIsLocked] = useState<boolean>(false);

    useEffect(() => {
        if (isFocused && focus) {
            focus();
        } else if (unFocus) {
            unFocus();
        }
    }, [isFocused]);

    useEffect(() => {
        if (!isHide) {
            setIsLocked(true);
            setTimeout(() => setIsLocked(false), TRANSITION_SECONDS * 1000);
        }
    }, [isHide]);

    const hideStyle = {
        height: 0,
        // overflow: "hidden",
        opacity: 0,
        padding: 0,
        margin: "-0.5em", // to compensate for parent's gap (1em)
    };

    return (
        <div className="interactive-list-row interactive-list-info-row"
            style={
                { ...(isHide ? hideStyle : {}),
                transition: `all ${TRANSITION_SECONDS}s ease`
            }}
            onClick={() => !isHide && !isLocked && setIsFocused(p => !p)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div data-key={`row-index-${index}`} >
                <IndexToPlayIcon index={index} isHovered={isHovered} isFocused={isFocused} />
            </div>
            <div style="display: flex; flex-direction: row; gap: 0.5em">
                <img src={row.image} style="width: 50px; height: 50px; border-radius: 0.5em"/>
                <div style="display: flex; flex-direction: column; gap: 0.5em">
                    <div style="font-size: 12pt; color: lightgrey">{row.primary}</div>
                    <div style="font-size: 10pt; color: grey">{row.secondary}</div>
                </div>
            </div>
            <div>
                <div style="font-size: 10pt; color: lightgrey">from: {row.startDate}</div>
                <div style="font-size: 10pt; color: lightgrey">to: {row.endDate}</div>
            </div>
        </div>
    )
}

interface IndexToPlayIconProps {
    index: number;
    isFocused: boolean;
}
function IndexToPlayIcon({
    index,
    isHovered,
    isFocused
}: IndexToPlayIconProps) {

    if (isFocused ) {
        return (
            <span className="material-icons" style="color: lightgrey">
                close
            </span>
        )
    }
    if (isHovered) {
        return (
            <span className="material-icons" style="color: lightgrey">
                play_arrow
            </span>
        )
    }
    return (
        <span>{index + 1}</span>
    )
}

function RowDetails({
    detail,
    links
} : {
    detail: string,
    links?: Array<{ name: string; url: string }>
}) {
    return (
        <>
            <div className="interactive-list-row-detail"
                 dangerouslySetInnerHTML={{ __html: markdownToHtml(detail) }}
            />
            { links && links.length > 0 && <div className="interactive-list-row-detail-links">
                {links.map((link, index) => (
                    <a href={link.url} target="_blank" rel="noreferrer" key={index}>
                        {link.name}
                    </a>
                ))}
            </div>}
        </>

    );
}