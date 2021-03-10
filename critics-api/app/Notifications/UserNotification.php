<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($type, $message, $target_id)
    {
        $this->type = $type;
        $this->message = $message;
        $this->target_id = $target_id;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        switch ($this->type) {
            case 'reply':
                return [
                    'parent_id' => $this->target_id,
                    'message' => $this->message,
                    'type' => $this->type
                ];
                break;
            case 'comment':
                return [
                    'review_id' => $this->target_id,
                    'message' => $this->message,
                    'type' => $this->type
                ];
                break;
            case 'follows':
                return [
                    'follower_id' => $this->target_id,
                    'message' => $this->message,
                    'type' => $this->type
                ];
                break;
            case "like to comment":
                return [
                    'comment_id' => $this->target_id,
                    'message' => $this->message,
                    'type' => $this->type
                ];
                break;
            case "like to review":
                return [
                    'review_id' => $this->target_id,
                    'message' => $this->message,
                    'type' => $this->type
                ];
                break;
            default:
                return [
                    'target_id' => $this->target_id,
                    'message' => $this->message,
                    'type' => $this->type
                ];
                break;
        }
    }
}
