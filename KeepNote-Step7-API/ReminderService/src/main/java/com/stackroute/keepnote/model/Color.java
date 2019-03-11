package com.stackroute.keepnote.model;

public class Color {

	private String r;
	private String g;
	private String b;
	private String a;
	public String getR() {
		return r;
	}
	public void setR(String r) {
		this.r = r;
	}
	public String getG() {
		return g;
	}
	public void setG(String g) {
		this.g = g;
	}
	public String getB() {
		return b;
	}
	public void setB(String b) {
		this.b = b;
	}
	public String getA() {
		return a;
	}
	public void setA(String a) {
		this.a = a;
	}
	@Override
	public String toString() {
		return "Color [r=" + r + ", g=" + g + ", b=" + b + ", a=" + a + "]";
	}
	
}
