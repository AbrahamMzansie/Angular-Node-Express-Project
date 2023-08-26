import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css'],
})
export class TrackOrderComponent {
  order!: Order;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    const params = activatedRoute.snapshot.params;
    if (!params.orderId) return;
    orderService.trackOrderById(params.orderId).subscribe((order) => {
      this.order = order;
    });
  }
}
