import { useMemo } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
interface UseFixedSizeListProps {
  itemsCount: number;
  itemHeight: number;
  listHeight: number;
  overscan?: number;
  getScrollElement: () => HTMLElement | null;
}

const DEFAULT_OVERSCAN = 3;

function useFixedSizeList(props: UseFixedSizeListProps) {
  const {
    itemHeight,
    itemsCount,
    overscan = DEFAULT_OVERSCAN,
    listHeight,
    getScrollElement,
  } = props;

  const [scrollTop, setScrollTop] = useState(0);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;

      setScrollTop(scrollTop);
    };

    handleScroll();

    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [getScrollElement]);

  const { virtualItems, startIndex, endIndex } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + listHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(itemsCount - 1, endIndex + overscan);

    const virtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }
    return { virtualItems, startIndex, endIndex };
  }, [scrollTop, listHeight, itemsCount]);

  const totalHeight = itemHeight * itemsCount;

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
  };
}

export default useFixedSizeList;
