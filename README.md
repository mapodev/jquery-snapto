# jQuery snapTo Plugin
jQuery Plugin to snap from value/array to specific value/array

## Usage
You can snap a number or an array full of numbers to a specifc value. This value can be also a number or an array. The target Input will snap to the values inside the snapTo function.

```
$([4,11,32,6]).snapTo([5,10,20]); // will return [5,10,32,5]
$(19).snapTo([5,10,20]); // will return 20
$([4,11,32,6]).snapTo(7); // will return [7,7,32,7]
$(9).snapTo(10); // will return 10
```
## Params

`snapTo` accepts also parameters.

### Limit

Limit defines the limit to which it snaps to. If it is outside the limit interval, it won't snap.

```
$([4,11,32,6]).snapTo([5,10,20], { limit: 50 }); // will return [5,10,20,5], but
$([4,11,32,6]).snapTo([5,10,20], { limit: 5 }); // will return [5,10,32,5]
```

### Tie

If a tie between snap values exist, it will snap to `'up'` or `'down'`. E.g.
Default is 'up'

```
$(10).snapTo([5,15], {tie: 'down'}); // will return 5
$(10).snapTo([5,15], {tie: 'up'}); // will return 15
$(10).snapTo([5,15]); // will return 15, because default is up
```

# Author

This plugin was created, because I needed such a function in work. Made by Marcin Poholski.
