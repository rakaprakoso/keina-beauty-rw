<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderStatus extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($orderData, $type = 1, ...$options)
    {
        $this->orderData = $orderData;
        $this->type = $type;
        $this->options = $options;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = "Order";
        switch ($this->type) {
            case '1':
                $subject = "Order Created";
                break;
            default:
                break;
        }

        return $this->from('no-reply@keinabeauty.com', 'Keina Beauty')
            ->subject('['.$this->orderData->order_id.']' . $subject)
            ->view('emails.order')
            ->with('orderData', $this->orderData)
            ->with('subject', $subject)
            ->with('options', $this->options)
            ->with('type', $this->type);
    }
}
