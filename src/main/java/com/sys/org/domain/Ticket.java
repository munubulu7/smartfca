package com.sys.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Ticket.
 */
@Entity
@Table(name = "ticket")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ticket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "ticket_no")
    private String ticketNo;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "note")
    private String note;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "resolv_date")
    private ZonedDateTime resolvDate;

    @ManyToOne
    private RegistrationInformation registrationInformation;

    @ManyToOne
    private TicketStatus ticketStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketNo() {
        return ticketNo;
    }

    public Ticket ticketNo(String ticketNo) {
        this.ticketNo = ticketNo;
        return this;
    }

    public void setTicketNo(String ticketNo) {
        this.ticketNo = ticketNo;
    }

    public String getTitle() {
        return title;
    }

    public Ticket title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Ticket description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNote() {
        return note;
    }

    public Ticket note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Ticket createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getResolvDate() {
        return resolvDate;
    }

    public Ticket resolvDate(ZonedDateTime resolvDate) {
        this.resolvDate = resolvDate;
        return this;
    }

    public void setResolvDate(ZonedDateTime resolvDate) {
        this.resolvDate = resolvDate;
    }

    public RegistrationInformation getRegistrationInformation() {
        return registrationInformation;
    }

    public Ticket registrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
        return this;
    }

    public void setRegistrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
    }

    public TicketStatus getTicketStatus() {
        return ticketStatus;
    }

    public Ticket ticketStatus(TicketStatus ticketStatus) {
        this.ticketStatus = ticketStatus;
        return this;
    }

    public void setTicketStatus(TicketStatus ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ticket ticket = (Ticket) o;
        if (ticket.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ticket.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ticket{" +
            "id=" + getId() +
            ", ticketNo='" + getTicketNo() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", note='" + getNote() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", resolvDate='" + getResolvDate() + "'" +
            "}";
    }
}
