/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfinv = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array erfinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfinv ).to.be.a( 'function' );
	});

	it( 'should evaluate the inverse error function', function test() {
		var data, actual, expected, i;

		data = new Float64Array([
			0.25,
			-0.25,
			0.6,
			-0.6,
			0.8,
			-0.8,
			0.999,
			-0.999,
			0.9999,
			-0.9999,
			9.999999999999999e-1,
			-9.999999999999999e-1
		]);
		actual = new Float64Array( data.length );

		actual = erfinv( actual, data );

		// Evaluated on Wolfram Alpha and Octave:
		expected = new Float64Array([
			0.225312,
			-0.225312,
			0.595116,
			-0.595116,
			0.906194,
			-0.906194,
			2.32675,
			-2.32675,
			2.75106,
			-2.75106,
			5.8636, // Octave
			-5.8636 // Octave
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( erfinv( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
