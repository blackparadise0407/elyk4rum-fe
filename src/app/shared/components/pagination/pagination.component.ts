import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

const DOT = -1;
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() total!: number;
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() siblingCount = 1;
  @Input() wrapperClass = '';
  @Output() pageChange = new EventEmitter<number>();

  public paginationRange: number[] = [];
  public totalPage!: number;

  constructor() {}

  public ngOnInit(): void {
    this.totalPage = Math.ceil(this.total / this.pageSize);
    this.paginationRange = this.calculatePaginationRange();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { currentPage } = changes;
    if (currentPage.currentValue !== currentPage.previousValue) {
      this.paginationRange = this.calculatePaginationRange();
    }
  }

  public handlePageChange(page: number) {
    this.pageChange.emit(page);
  }

  public handleNextPage() {
    if (this.currentPage < this.totalPage) {
      this.handlePageChange(this.currentPage + 1);
    }
  }

  public handlePrevPage() {
    if (this.currentPage > 1) {
      this.handlePageChange(this.currentPage - 1);
    }
  }

  private range(start: number, end: number) {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }

  private calculatePaginationRange() {
    const totalPageNumbers = this.siblingCount + 5;

    if (totalPageNumbers >= this.totalPage) {
      return this.range(1, this.totalPage);
    }

    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(
      this.currentPage + this.siblingCount,
      this.totalPage
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < this.totalPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = this.totalPage;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * this.siblingCount;
      let leftRange = this.range(1, leftItemCount);

      return [...leftRange, DOT, this.totalPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * this.siblingCount;
      let rightRange = this.range(
        this.totalPage - rightItemCount + 1,
        this.totalPage
      );
      return [firstPageIndex, DOT, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOT, ...middleRange, DOT, lastPageIndex];
    }

    return [];
  }
}
