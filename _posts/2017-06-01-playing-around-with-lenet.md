---
id: 1108
title: Playing Around With LeNet
date: 2017-06-01T19:18:55+00:00
author: danya
layout: post
image: /assets/images/featured/lenet.png
categories:
  - neither hither nor thither
---
Just for fun, I followed along <a href="http://www.pyimagesearch.com/2016/08/01/lenet-convolutional-neural-network-in-python/">this</a> tutorial on how to build <a href="http://yann.lecun.com/exdb/lenet/">LeNet</a> &#8211; an early & famously successful neural net used for handwriting recognition &#8211; in Python. I&#8217;ve been playing with the data a bit to see how my modifications affect the learning rate. Here&#8217;s what I tried:<!--more-->

  * Rotate each image by 90deg
  * Rotate each image by 180deg
  * Rotate each image by 270deg
  * Invert high and low values (Note: high values are represented by white and low values are represented by black)
  * Fade image &#8211; reduce intensity by halving all values
  * Eliminate &#8220;in-between&#8221; values &#8211; all pixel values are either 1 (white) or 0 (black)
  * Randomly rotate each image (by either 90, 180 or 270deg)
  * Randomly rotate each image, after adding an indicator line to the bottom of the image

## Uniform Rotation

<a href="/assets/images/uploads/2017/06/rotate-1.png" rel='magnific'><img class="alignleft wp-image-1115 size-full" src="/assets/images/uploads/2017/06/rotate-1-300x120.png" alt="rotate-1" width="300" height="120" /></a><a href="/assets/images/uploads/2017/06/rotate-2.png" rel='magnific'><img class="alignleft wp-image-1114 size-medium alignleft" src="/assets/images/uploads/2017/06/rotate-2-300x120.png" alt="rotate-2" width="300" height="120" /></a><a href="/assets/images/uploads/2017/06/rotate-3.png" rel='magnific'><img class="alignleft wp-image-1113 size-medium alignleft" src="/assets/images/uploads/2017/06/rotate-3-300x120.png" alt="rotate-3" width="300" height="120" /></a>

<div style="float: none; clear: both;">
</div>

To begin with, I rotated the images by, in turn, 90, 180, and 270 degrees.

```python
...

data = dataset.data.reshape((dataset.data.shape[0], 28, 28))

rotation = 1 # 90deg
# rotation = 2 # 180deg
# rotation = 3 # 270deg

for i, val in enumerate(data):
    data[i] = np.rot90(data[i], rotation)

...
```

At each rotation, I ran LeNet for 30 epochs. As expected, those transformations did not appear to affect learning rate, because the transformation was applied uniformly across all data. In addition, these transformations will not affect any other attributes of the data, such as mean value over the whole image.

<a href="/assets/images/uploads/2017/06/Figure_rotations.png" rel='magnific'><img class="alignnone size-full wp-image-1112" src="/assets/images/uploads/2017/06/Figure_rotations.png" alt="Figure_rotations" width="640" height="480" /></a>

&nbsp;

## Value/Intensity

<a href="/assets/images/uploads/2017/06/invert-color.png" rel='magnific'><img class="alignleft size-medium wp-image-1120" src="/assets/images/uploads/2017/06/invert-color-300x120.png" alt="invert-color" width="300" height="120" /></a><a href="/assets/images/uploads/2017/06/lighten-color.png" rel='magnific'><img class="alignleft size-medium wp-image-1119" src="/assets/images/uploads/2017/06/lighten-color-300x120.png" alt="lighten-color" width="300" height="120" /></a><a href="/assets/images/uploads/2017/06/binary-color.png" rel='magnific'><img class="alignleft size-medium wp-image-1121" src="/assets/images/uploads/2017/06/binary-color-300x120.png" alt="binary-color" width="300" height="120" /></a>

<div style="float: none; clear: both;">
</div>

I then tried playing around with the values in the image.

```python
...
def transformData(data):
  return data/255. # normal (values must, in any case, be converted from range 0-255 to range 0-1)
  # return 1 - (data/255.) # invert values
  # return data/(255. * 2) # fade image - reduce intensity by halving all values
  # return data &gt; 127.5 # make values binary

(trainData, testData, trainLabels, testLabels) = train_test_split(
    transformData(data), dataset.target.astype("int"), test_size=0.33)
...
```

As in the case of uniform rotation across all data, these changes were applied uniformly to all data. So, we wouldn&#8217;t expect these alterations to have a substantial negative impact on the ability of the network to eventually converge. However, these alteration will have changed important underlying structures of the data such as the mean and variance of the values in any given image. To illustrate, applying these value/intensity transformations to one set of 5 randomly chosen images results in the following:

```md
normal
------
mean: 0.119206682497
variance: 0.0883226659517

binary
------
mean: 0.123979591837
variance: 0.108608652645

fade
----
mean: 0.0596033412487
variance: 0.0220806664879

invert
------
mean: 0.880793317503
variance: 0.0883226659517
```

As you can see below, the binary color and inverted color images get off to a slower start but soon catch up, after 5 epochs.

<a href="/assets/images/uploads/2017/06/Figure_values_5e.png" rel='magnific'><img class="alignnone size-full wp-image-1136" src="/assets/images/uploads/2017/06/Figure_values_5e.png" alt="Figure_values_5e" width="640" height="480" /></a>

<div>
  (Note that I am comparing individual runs of LeNet; the difference between these learning rates is small enough that it might be reasonable to expect that these observed differences are random occurrences and would disappear when comparing the averages of multiple runs.)
</div>

<div style="float: none; clear: both;">
  &nbsp;
</div>

The faded image, however, also gets off to a slow start but takes many more epochs to catch up.

<div style="float: none; clear: both;">
</div>

<a href="/assets/images/uploads/2017/06/Figure_values_30e.png" rel='magnific'><img class="alignnone size-full wp-image-1135" src="/assets/images/uploads/2017/06/Figure_values_30e.png" alt="Figure_values_30e" width="640" height="480" /></a>

<div style="float: none; clear: both;">
</div>

## Random Rotation

<a href="/assets/images/uploads/2017/06/random-rotate.png" rel='magnific'><img class="alignleft size-medium wp-image-1117" src="/assets/images/uploads/2017/06/random-rotate-300x120.png" alt="random-rotate" width="300" height="120" /></a><a href="/assets/images/uploads/2017/06/random-rotate-with-indicators.png" rel='magnific'><img class="alignleft size-medium wp-image-1116" src="/assets/images/uploads/2017/06/random-rotate-with-indicators-300x120.png" alt="random-rotate-with-indicators" width="300" height="120" /></a>

<div style="float: none; clear: both;">
</div>

Finally, I randomly rotated the images, both with and without the addition of an &#8220;indicator&#8221; line (a line of all 1s &#8211; pure white &#8211; added to the bottom of the image before applying the random rotation, to serve as an indicator of the &#8220;true&#8221; bottom of the image:

```python
...

data = dataset.data.reshape((dataset.data.shape[0], 28, 28))

for i, val in enumerate(data):
    indicator = np.ones(28) * 255.
    # data[i][27] = indicator.tolist() # add indicator
    data[i] = np.rot90(data[i], randint(0,3))

...
```

Unsurprisingly, the worst performance of all the data modifications occurred as a result of randomly rotating the images. In this case, the transformation was not uniformly applied to each image. The addition of the indicator line had a substantial positive impact on the learning rate. However, interestingly, this positive effect was only observed after 5 epochs. Even so, neither modification was able to eventually converge to an accuracy similar to unmodified data, after 30 epochs.

<a href="/assets/images/uploads/2017/06/Figure_random_rotate.png" rel='magnific'><img class="alignnone size-full wp-image-1111" src="/assets/images/uploads/2017/06/Figure_random_rotate.png" alt="Figure_random_rotate" width="640" height="480" /></a>
